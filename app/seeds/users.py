from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password')
    rye = User(
        username='theWryRyeGuy', email='rye@bread.io', password='password')
    sourdough = User(
        username='sowrdohsubmarine', email='sour@bread.io', password='password')
    sunny = User(
        username='sunbakedbuns', email='solar@oven.io', password='password')
    banana = User(
        username='Bananas4BananaBread', email='banana@bread.io', password='password')
    shorty = User(
        username='shortbreadTallOrder', email='short@bread.io', password='password')
    anon = User(
        username='WhoKneads2Know', email='anon@aa.io', password='password')
    rubaud = User(
        username='RubaudsMethod', email='rubaud@aa.io', password='password')
    bagel = User(
        username='BagelsOnLock', email='bagels@lox.io', password='password')
    challah = User(
        username='ChallahBackGirl', email='challah@loaf.io', password='password')
    loaf = User(
        username='LoaftyPursuits', email='loafty@pursuits.io', password='password')
    butter = User(
        username='BreadinButter', email='bread@aa.io', password='password')
    focaccia = User(
        username='focacciafan400', email='focaccia@fan.com', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(rye)
    db.session.add(sourdough)
    db.session.add(sunny)
    db.session.add(banana)
    db.session.add(shorty)
    db.session.add(anon)
    db.session.add(rubaud)
    db.session.add(bagel)
    db.session.add(challah)
    db.session.add(loaf)
    db.session.add(butter)
    db.session.add(focaccia)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
