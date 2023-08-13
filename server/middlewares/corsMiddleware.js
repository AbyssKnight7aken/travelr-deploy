exports.useCORS = (req, res, next) => {

    //res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Origin", 'https://main--sprightly-donut-f255c4.netlify.app');
    res.setHeader("Access-Control-Allow-Credentials", true);

    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Enctype, X-Authorization');

    next();
}