from pymongo import MongoClient

class MongoDB:
    def __init__(self, uri, dbname):
        self.uri =uri
        self.dbname =dbname
        self.client =None
        self.db = None

    def connect(self):
        self.client =MongoClient(self.uri)
        self.db =self.client[self.dbname]
        print(f"Connected to database: {self.dbname}")

    def close(self):
        if self.client:
            self.client.close()
            print("Database connection closed")
