from fastapi import FastAPI, HTTPException, Depends,Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from pydantic import BaseModel, Field, validator
from typing import List, Optional
import uuid
import random
import logging
from datetime import datetime
from services.game_service import get_all_levels, get_level_by_id
import json
import requests

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger("miniminds")

# Create FastAPI app
app = FastAPI(
    title="MiniMinds Lab API",
    description="Backend API for MiniMinds Lab educational platform with SQLite storage",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for now
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the valid avatars
VALID_AVATARS = ["🧑‍🚀", "👩‍🎨", "🧙‍♂️", "🧑‍💻", "🦸‍♀️", "🧑‍🚀"]

# SQLAlchemy setup
SQLALCHEMY_DATABASE_URL = "sqlite:///./miniminds.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# SQLAlchemy model for user session
class UserSession(Base):
    __tablename__ = "user_sessions"
    
    session_id = Column(String, primary_key=True, index=True)
    username = Column(String, index=True)
    avatar = Column(String)
    created_at = Column(DateTime, default=datetime.now)

# Create all tables
Base.metadata.create_all(bind=engine)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Pydantic models for request/response validation
class SessionCreate(BaseModel):
    username: str = Field(..., min_length=3, max_length=12)
    avatar: str

    @validator('username')
    def username_must_be_alphanumeric(cls, v):
        if not v.isalnum():
            raise ValueError('username must contain only letters and numbers')
        return v

    @validator('avatar')
    def avatar_must_be_valid(cls, v):
        if v not in VALID_AVATARS:
            raise ValueError(f'avatar must be one of: {", ".join(VALID_AVATARS)}')
        return v

class SessionResponse(BaseModel):
    sessionId: str
    username: str
    avatar: str
    created_at: Optional[str] = None

    class Config:
        orm_mode = True

# Helper function to generate UUID
def generate_session_id() -> str:
    return str(uuid.uuid4())

# Helper function to generate random guest username
def generate_guest_username() -> str:
    guest_number = random.randint(1000, 9999)
    return f"Guest{guest_number}"

# Helper function to generate random avatar
def get_random_avatar() -> str:
    return random.choice(VALID_AVATARS)

# Endpoints
@app.post("/api/session/create", response_model=SessionResponse)
async def create_session(session_data: SessionCreate, db: Session = Depends(get_db)):
    # Generate session ID
    session_id = generate_session_id()
    
    # Create new UserSession object
    db_session = UserSession(
        session_id=session_id,
        username=session_data.username,
        avatar=session_data.avatar,
        created_at=datetime.now()
    )
    
    # Add to database
    db.add(db_session)
    db.commit()
    db.refresh(db_session)
    
    # Log session creation
    logger.info(f"New session created: {session_id} for user {session_data.username}")
    
    # Return formatted response
    return {
        "sessionId": db_session.session_id,
        "username": db_session.username,
        "avatar": db_session.avatar,
        "created_at": db_session.created_at.isoformat()
    }

@app.get("/api/session/{session_id}", response_model=SessionResponse)
async def get_session(session_id: str, db: Session = Depends(get_db)):
    # Query database for session
    db_session = db.query(UserSession).filter(UserSession.session_id == session_id).first()
    
    if not db_session:
        logger.warning(f"Session not found: {session_id}")
        raise HTTPException(status_code=404, detail="Session not found")
    
    logger.info(f"Session retrieved: {session_id}")
    
    # Return formatted response
    return {
        "sessionId": db_session.session_id,
        "username": db_session.username,
        "avatar": db_session.avatar,
        "created_at": db_session.created_at.isoformat()
    }

@app.post("/api/session/guest", response_model=SessionResponse)
async def create_guest_session(db: Session = Depends(get_db)):
    # Generate guest data
    guest_username = generate_guest_username()
    guest_avatar = get_random_avatar()
    
    # Generate session ID
    session_id = generate_session_id()
    
    # Create new UserSession object
    db_session = UserSession(
        session_id=session_id,
        username=guest_username,
        avatar=guest_avatar,
        created_at=datetime.now()
    )
    
    # Add to database
    db.add(db_session)
    db.commit()
    db.refresh(db_session)
    
    # Log guest session creation
    logger.info(f"New guest session created: {session_id} for {guest_username}")
    
    # Return formatted response
    return {
        "sessionId": db_session.session_id,
        "username": db_session.username,
        "avatar": db_session.avatar,
        "created_at": db_session.created_at.isoformat()
    }

@app.get("/api/stats")
async def get_stats(db: Session = Depends(get_db)):
    """Get basic stats about active sessions"""
    
    # Count total sessions
    total_sessions = db.query(UserSession).count()
    
    # Count avatars distribution
    avatars_distribution = {}
    for avatar in VALID_AVATARS:
        count = db.query(UserSession).filter(UserSession.avatar == avatar).count()
        avatars_distribution[avatar] = count
    
    return {
        "active_sessions": total_sessions,
        "avatars_distribution": avatars_distribution
    }


@app.get("/api/health")
async def health_check():
    """Simple health check endpoint"""
    return {"status": "ok", "timestamp": datetime.now().isoformat()}


@app.get("/api/{game_name}/levels")
async def all_levels(game_name: str):
    levels = get_all_levels(game_name)
    if levels:
        return levels
    raise HTTPException(status_code=404, detail="Game not found")

@app.get("/api/{game_name}/levels/{level_id}")
async def level_by_id(game_name: str, level_id: int):
    level = get_level_by_id(game_name, level_id)
    if level:
        return level
    raise HTTPException(status_code=404, detail="Level not found")
with open("./games/memory_card/memory-cards.json", "r") as f:
    memory_cards = json.load(f)

# Endpoint to get all cards
@app.get("/api/cards")
async def get_cards():
    return memory_cards


# Endpoint for basic healthcheck
@app.get("/api/health")
def health_check():
    return {"status": "OK"}

# Endpoint to generate feedback from Pollinations AI
@app.get("/api/feedback")
def generate_feedback(difficulty: str = Query(...), tries: int = Query(...), time: int = Query(...)):
    """
    Generate a motivational feedback text for the kid after winning a game.
    difficulty: easy / medium / hard
    tries: number of attempts
    time: time taken in seconds
    """

    prompt = (
        f"Create a motivational and positive message for a kid who just completed a {difficulty} logic puzzle. "
        f"They completed it in {tries} tries and {time} seconds. "
        "Make it super encouraging, happy, and age-appropriate (6 to 10 years old). Max 2 sentences."
    )

    try:
        # Using Pollinations API (free and open, no key needed)
        response = requests.get(
            f"https://api.pollinations.ai/text2text",
            params={"prompt": prompt},
            timeout=10
        )
        data = response.json()

        # Pollinations returns { "result": "Generated text..." }
        feedback_text = data.get("result", "Great job, you're amazing!")

        return {"feedback": feedback_text}

    except Exception as e:
        print(f"Error generating feedback: {e}")
        return {"feedback": "Great job! You're an awesome programmer!"}
# Run the application with uvicorn
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main_with_sqlite:app", host="0.0.0.0", port=8000, reload=True)