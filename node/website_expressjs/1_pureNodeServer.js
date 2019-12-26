const http = require("http");
const url = require("url");

const handler = (request, response) => {
    const parseQueryString = true;
    const parsedURL = url.parse(request.url, parseQueryString);

    response.setHeader("x-server-date", new Date());

    if (parsedURL.pathname === "/") {
        response.writeHead(200, {
            "Content-type": "text/plain",
        });
        response.write("This is a pure node.js server!");

    } else if (parsedURL.pathname === "/greet") {
        const name = parsedURL.query.name;
        if(!name) {
            response.writeHead(400, {
                "Content-type": "text/plain",
            });
        } else {
            response.writeHead(200, {
                "Content-type": "text/plain",
            });

            response.write(`Hello ${name}`);
        }

    } else if(parsedURL.pathname.startsWith("/user/")) {
        const usernameRegex = new RegExp("\/user\/(.+)");
        const matches = usernameRegex.exec(parsedURL.pathname);

        if (!matches || !matches[1]) {
            response.writeHead(400, {
                "Content-type": "text/plain",
            });
        } else {
            response.writeHead(200, {
                "Content-type": "text/plain",
            });

            response.write(`User profile of ${matches[1]}`);
        }
    } else {
        response.writeHead(404, {
            "Content-type": "text/plain",
        });
    }

    response.end();
}

const server = http.createServer(handler);
server.listen(3000);
