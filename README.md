## Alamofire Todo Server

A simple rewrite of the node server application used for a [Appcoda Tutorial](http://www.appcoda.com/alamofire-beginner-guide/) code base.
I felt that there was so much un-need overhead, causing not only techincal debt, but most of it seem like a distraction from 
acehiving the goals of the article.

This codebase is only the Express server application and does not include the IOS port of the article. Follow
the instructions below to get started.

#### Requirements:
- Node 5.1.1+ [nodejs download](http://nodejs.org)

#### Changes:
- Opted for a local in-memory storage vs remote MongoDB service
- Opted for local development server vs remote Heroku service

**Because the local server is unsecured (http vs https), you will need to update
your .plist file in your IOS app:
- `App Transport Security Settings [Dictonary]`
- Under `App Transport Security Settings` add `Allow Arbitrary Loads [Boolean] [YES]`

**IOS does not allow unsercured connections for good reason, so use this in development,
never push a live app out with this setting.**

**In the original return data, you are asked to add `"_id"` to a array for each object in 
the resulting feed. This is MongoDB specific, when using this server, UnderscoreJS ids are
returned. i.e. `"cid"`

#### Ready Set Fire
----------------------------
- Install Dependencies `npm install` in project root
- Seed Database (Pre-populate Data) `npm run seed [database] [collection]` 
- Run the Server `npm start`

**You can also run the bootstrap file as a CLI**
- `./bootstrap -h`
- `./bootstrap -n [database]`
- `./bootstrap -c [collection]`
- `./bootstrap -s`
- `./bootstrap -a [databse] [collection]`

#### Application Test 
if you are so inclinded to make sure everything is working as it should be:
- Run mocha test `npm test`

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org>
