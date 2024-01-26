from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_comments():
    focaccia = Comment(
        body='Yeah! It was great! 10/10 would do again!', user_id=6, toast_id=1)
    bake_fails = Comment(
        body='Maybe the water was too hot? Was it room temp?', user_id=3, toast_id=2)
    bake_fails2 = Comment(
        body='When was your starter last fed? Maybe it was too far past peak?', user_id=7, toast_id=2)
    low_tech = Comment(
        body='Want you on my apocalypse team!', user_id=2, toast_id=3)
    banana_cake = Comment(
        body='Banana bread is totally bread, it rises just like any other bread! Why don\'t you go hate on tortillas for a change??', user_id=2, toast_id=4)
    baguette = Comment(
        body='Where are the instructions????', user_id=8, toast_id=5)
    pan = Comment(
        body='That sounds delicious, sign me up!', user_id=9, toast_id=6)
    best_loafs = Comment(
        body='That looks amazing!', user_id=5, toast_id=7)
    best_loafs2 = Comment(
        body='Great job!! Did you do an egg wash to get that color on there?', user_id=5, toast_id=7)
    banana_bread = Comment(
        body='Thank you!! I am totally gonna go make some banana bread later today.', user_id=9, toast_id=8)
    technique = Comment(
        body='Tried this and my loaf came out great! I\'ve never had such big alveoli!!', user_id=3, toast_id=9)
    technique2 = Comment(
        body='Aw, man I was gonna say try slap and fold but if you don\'t have the counter space maybe you can check out that post on autolysing it might help.', user_id=8, toast_id=10)


    db.session.add(focaccia)
    db.session.add(bake_fails)
    db.session.add(bake_fails2)
    db.session.add(low_tech)
    db.session.add(banana_cake)
    db.session.add(baguette)
    db.session.add(pan)
    db.session.add(best_loafs)
    db.session.add(best_loafs2)
    db.session.add(banana_bread)
    db.session.add(technique)
    db.session.add(technique2)
    db.session.commit()


def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
