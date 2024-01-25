from app.models import db, Toast, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_toasts():
    focaccia = Toast(
        title='Sourdough Focaccia!', body='Has anyone tried using sourdough discard to make focaccia? It\'s a great way to use up discard!', user_id=12, image_url="", subbreadit_id=1)
    bake_fails = Toast(
        title='Loaf Didn\'t Rise, Help!', body='Tried to make a loaf of sourdough and it didn\'t rise properly! I passed the float test, I don\'t know whats wrong!', user_id=1, image_url="", subbreadit_id=2)
    low_tech = Toast(
        title='Glass Oven', body='Has anyone seen that metal oven with a glass top that can bake a loaf in three hours? Talk about apocalypse ready.', user_id=3, image_url="", subbreadit_id=3)
    banana_cake = Toast(
        title='Banana Bread is not Bread', body="It doesn't even take any leavening! It's a cake, not a bread. Get real, folks!", user_id=11, image_url="", subbreadit_id=4)
    baguette = Toast(
        title='French Baguette Recipe', body="for the poolish: 1 cup of flour, 1/2 cup of water, pinch of dry yeast, rest overnight. for the dough: 3 1/2 cups flour, 1 cup water, poolish, 2 tsp salt, 1 1/2 dry yeast.", user_id=6, image_url="", subbreadit_id=5)
    pan = Toast(
        title='Pan de Bono', body="Has anyone ever tried putting guava in their pan de bono? Like a guava and cheese tequeño? Let me know in the comments!", user_id=10, image_url="", subbreadit_id=6)
    best_loafs = Toast(
        title='Challah-luyah!', body='Made an awesome loaf of challah today! Check out that ovenspring!', user_id=4, image_url="", subbreadit_id=7)
    banana_bread = Toast(
        title='Banana Bread IS Bread!', body='All the naysayers have to admit banana bread is the best kind of bread-- it\'s hearty, you can have it for breakfast or dessert, and it\'s perfect for french toast. Who could deny the deliciousness of banana bread?', user_id=4, image_url="", subbreadit_id=8)
    technique = Toast(
        title='To Autolyse or not to Autolyse', body='Get a quick, easy, gorgeous window-pane by autolysing your dough! Just mix flour and water before adding in your starter or salt and let it sit at room temp for four ~ eight hours and watch the texture change!', user_id=10, image_url="", subbreadit_id=9)
    technique2 = Toast(
        title='Mixing Methods', body='Been trying the Rubaud method while kneading my dough and my hand keeps knocking against the inside of the bowl. Does anyone have any other techniques for kneading that aren\'t the slap and fold method? P.S. I have a small counter space.', user_id=10, image_url="", subbreadit_id=9)
    focaccia2 = Toast(
            title='Rosemary Focaccia', body='Made some rosemary focaccia with some of the rosemary in my mother\'s garden today. It didn\'t last long, but was delicious with some tomatoes and mozz.', user_id=15, image_url="https://live.staticflickr.com/65535/53485233806_febea03864_h.jpg", subbreadit_id=1)
    bake_win = Toast(
            title='Simple but Tasty', body='It isn\'t the flashiest loaf but boy did it taste great! Thanks for all the tips, breadit!!', user_id=9, image_url="https://live.staticflickr.com/65535/53485536439_b011fbf18c_h.jpg", subbreadit_id=7)
    bake_fail = Toast(
            title='Why is my loaf flat?', body='My loaf came out looking like a shoe! Image attached, please help!!!', user_id=3, image_url="https://live.staticflickr.com/65535/53484323217_2e13675423_h.jpg", subbreadit_id=2)
    best_bake = Toast(
            title='Pumpkin shaped loaf!', body='Finally got around to making one of those pumpkin shaped loaves for the holidays! Can\'t wait to share it with family and friends!', user_id=4, image_url="https://live.staticflickr.com/65535/53485536524_af000cc916_h.jpg", subbreadit_id=7)
    bagel_bake = Toast(
            title='Best Bagel Method?', body='Making some bagels and wondering if anyone knows what would be better to boil them in before baking: honey or barley malt?', user_id=10, image_url="https://live.staticflickr.com/65535/53485375353_3c0aa45279_h.jpg", subbreadit_id=14)
    pink_floyd = Toast(
            title='Any Pink Floyd fans here?', body='Made a loaf for a friend who is into them-- I hope she likes it!', user_id=9, image_url="https://live.staticflickr.com/65535/53485536509_2cb9602f3a_h.jpg", subbreadit_id=12)
    pan_cubano = Toast(
            title='Looking for sources on pan cubano!', body='Heard somewhere recently that the top of the loaf isn\'t scored with a lame but with a palm leaf that is laid on top of the loaf before baking! If anyone has seen any sources that corroborate that, please let me know in the comments!', user_id=15, image_url="", subbreadit_id=6)
    bono = Toast(
            title='Best Pan de Bono recipe?', body='Looking to make some pan de bono but struggling to find a good recipe. Can anyone help me find one that they\'ve tested and enjoyed?', user_id=14, image_url="", subbreadit_id=6)
    cheese = Toast(
            title='Cheddar and Chive Sourdough', body='I\'ve been thinking of folding some cheddar and chives into a loaf during the lamination stage but wondering if that means I should aim for a shorter bulk ferment. Can anyone with experience comment? Thanks in advance!', user_id=13, image_url="", subbreadit_id=12)
    baguette2 = Toast(
            title='Shape Your Baguettes into Baguettes!', body='When shaping baguettes, always remember to roll them tight and thin! They are meant to be baguettes, not bâtards!', user_id=8, image_url="", subbreadit_id=6)
    banana_bread4 = Toast(
            title='Bananas for Banana Bread', body='Wondering when people are going to wake up to the anti-banana-bread agenda!! Banana bread is where it\'s at folks! It doesn\'t get any better than a slice of warm, buttery banana bread with a glass of milk.', user_id=7, image_url="", subbreadit_id=8)
    banana_bread5 = Toast(
            title='Sans ou Avec?', body='I am here to ask the real questions like, banana bread with walnuts or without? With chocolate chips?? I think yes. Everyone else can go look up the anti-banana-bread sub :(.', user_id=10, image_url="", subbreadit_id=8)


    db.session.add(focaccia)
    db.session.add(bake_fails)
    db.session.add(low_tech)
    db.session.add(banana_cake)
    db.session.add(baguette)
    db.session.add(pan)
    db.session.add(best_loafs)
    db.session.add(banana_bread)
    db.session.add(technique)
    db.session.add(technique2)
    db.session.add(focaccia2)
    db.session.add(bake_win)
    db.session.add(bake_fail)
    db.session.add(best_bake)
    db.session.add(bagel_bake)
    db.session.add(pink_floyd)
    db.session.add(pan_cubano)
    db.session.add(bono)
    db.session.add(cheese)
    db.session.add(baguette2)
    db.session.add(banana_bread4)
    db.session.add(banana_bread5)
    db.session.commit()


def undo_toasts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.toasts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM toasts"))

    db.session.commit()
