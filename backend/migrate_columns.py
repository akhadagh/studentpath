"""
Quick migration script to add missing columns to existing tables.
Run: python migrate_columns.py
"""
import asyncio
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.core.database import engine
import sqlalchemy


ALTERATIONS = [
    # Users table
    "ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(20) DEFAULT 'user'",
    "ALTER TABLE users ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ",

    # Results table
    "ALTER TABLE results ADD COLUMN IF NOT EXISTS cluster_scores JSONB DEFAULT '{}'::jsonb",
    "ALTER TABLE results ADD COLUMN IF NOT EXISTS explanations JSONB DEFAULT '{}'::jsonb",

    # Assessments table
    "ALTER TABLE assessments ADD COLUMN IF NOT EXISTS total_steps INTEGER DEFAULT 6",
    "ALTER TABLE assessments ADD COLUMN IF NOT EXISTS current_step INTEGER DEFAULT 1",

    # Sources table - add FK
    "ALTER TABLE sources ADD COLUMN IF NOT EXISTS university_id INTEGER REFERENCES universities(id)",

    # Programme requirements - add FK
    "ALTER TABLE programme_requirements ADD COLUMN IF NOT EXISTS programme_id INTEGER",
    "ALTER TABLE programme_requirements ADD COLUMN IF NOT EXISTS source_id INTEGER REFERENCES sources(id)",

    # Programme cut_offs - add FK
    "ALTER TABLE programme_cut_offs ADD COLUMN IF NOT EXISTS programme_id INTEGER",
    "ALTER TABLE programme_cut_offs ADD COLUMN IF NOT EXISTS source_id INTEGER REFERENCES sources(id)",

    # Saved universities - add FK
    "ALTER TABLE saved_universities ADD COLUMN IF NOT EXISTS user_id INTEGER REFERENCES users(id)",
    "ALTER TABLE saved_universities ADD COLUMN IF NOT EXISTS university_id INTEGER REFERENCES universities(id)",

    # Saved programmes - add FK
    "ALTER TABLE saved_programmes ADD COLUMN IF NOT EXISTS user_id INTEGER REFERENCES users(id)",
    "ALTER TABLE saved_programmes ADD COLUMN IF NOT EXISTS programme_id INTEGER REFERENCES programmes_v2(id)",

    # Campuses - add FK
    "ALTER TABLE university_campuses ADD COLUMN IF NOT EXISTS university_id INTEGER",
    "ALTER TABLE university_campuses ADD COLUMN IF NOT EXISTS programmes JSONB DEFAULT '[]'::jsonb",
]


async def migrate():
    from sqlalchemy.ext.asyncio import create_async_engine
    import ssl, re

    db_url = os.environ.get("DATABASE_URL", "")
    if not db_url:
        print("ERROR: Set DATABASE_URL env var")
        return

    db_url = db_url.replace("postgresql://", "postgresql+asyncpg://")
    db_url = re.sub(r'\?.*$', '', db_url)

    ssl_context = ssl.create_default_context()
    ssl_context.check_hostname = False
    ssl_context.verify_mode = ssl.CERT_NONE

    engine = create_async_engine(db_url, connect_args={"ssl": ssl_context})

    print("=" * 50)
    print("StudentPath Migration Script")
    print("=" * 50)

    async with engine.begin() as conn:
        for sql in ALTERATIONS:
            try:
                await conn.execute(sqlalchemy.text(sql))
                print(f"  OK: {sql[:60]}...")
            except Exception as e:
                if "already exists" in str(e).lower() or "duplicate" in str(e).lower():
                    print(f"  SKIP: {sql[:60]}... (already exists)")
                else:
                    print(f"  WARN: {sql[:60]}... ({e})")

    await engine.dispose()
    print("=" * 50)
    print("Migration complete!")
    print("=" * 50)


if __name__ == "__main__":
    asyncio.run(migrate())
