module.exports = {
      cookie: {
            "secret": "session",
            "key": "abhrasd5sdf64ds697Rd0KnddSsd3V"
      },
      session: {
            secret: "abdsfhH4ras9d87asRd0sdfsdKndff3V",
            resave: true,
            saveUninitialized: true,
            maxAge: Date.now() + (30 * 86400 * 1000)
      },
};