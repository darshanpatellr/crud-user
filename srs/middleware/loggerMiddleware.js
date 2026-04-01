const loggerMiddleware = (req, res, next) => {
    const start = Date.now();

    const {method, originalUrl, headers, body, query} = req;

    // Generate CURL command
    const curl = generateCurl(req);

    console.log("\n| ------------ 📥 Incoming Request ------------");
    console.log("| ➡️ Method:", method);
    console.log("| ➡️ URL:", originalUrl);
    console.log("| ➡️ Query:", query);
    console.log("| ➡️ Body:", body);
    console.log("| ➡️ Headers:", headers);
    console.log("| ➡️ CURL:\n", curl);

    // Capture response
    const oldSend = res.send;

    res.send = function (data) {
        const duration = Date.now() - start;

        console.log("\n| 📤 Response");
        console.log("| ⬅️ Status:", res.statusCode);
        console.log("| ⬅️ Time:", duration + "ms");
        console.log("| ⬅️ Response Body:", data);

        oldSend.apply(res, arguments);
    };

    next();
};

// Helper to generate curl
function generateCurl(req) {
    const {method, originalUrl, headers, body} = req;

    let curl = `curl -X ${method} "http://localhost:3000${originalUrl}"`;

    // Headers
    Object.entries(headers).forEach(([key, value]) => {
        curl += ` \\\n  -H "${key}: ${value}"`;
    });

    // Body
    if (body && Object.keys(body).length > 0) {
        curl += ` \\\n  -d '${JSON.stringify(body)}'`;
    }

    return curl;
}

module.exports = {loggerMiddleware};