db = db.getSiblingDB('admin');

try {
    db.createUser({
        user: "root",
        pwd: "asdasd",
        roles: [ "root"]
    });
} catch(err) {
    print(err.message);
}

db = db.getSiblingDB('api-users');
db.createUser({
	user: "api",
	pwd: "asd",
	roles: [ "readWrite" ]
});
