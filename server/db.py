import pymongo

conn_str = "mongodb+srv://Centigrade:centigrade_123@centiconnect.uhvbj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
client = pymongo.MongoClient(conn_str, serverSelectionTimeoutMS=5000)

uid = "1234"
users = client['users']
user = users[uid]

result = user.insert_many([{"name" : "Dharun"}])


