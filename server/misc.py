import os
from services import firebase as fb
from PIL import Image


def compress(file):
    filepath = ""  # storage
    picture = Image.open(filepath)
    picture.save("Compressed_"+file,
                 "PNG",
                 optimize=True,
                 quality=10)
    return
