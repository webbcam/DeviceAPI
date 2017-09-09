db_port = 27017;
db = 'devicedb';
username = 'device-app';
passwd = process.env.PASSWD;
secret = process.env.SECRET;

module.exports = {
  'db_uri':'mongodb://localhost:'+db_port+'/'+db+'?authSource=admin',
  db_options: {
    user: username,
    pass: passwd
  },
  secret: secret
};

