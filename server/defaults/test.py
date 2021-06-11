with open("connect_default.jpeg", "rb") as r:
    data = r.read()
    with open("test.jpeg", "wb") as w:
        w.write(data)