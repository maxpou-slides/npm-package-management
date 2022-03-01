import React from "react";
import {
  Deck,
  Slide,
  Heading,
  Image,
  Text,
  ListItem,
  UnorderedList,
  CodePane,
  indentNormalizer,
  Appear,
} from "spectacle";
import material from "react-syntax-highlighter/dist/esm/styles/prism/material-dark";

import conventionalcommitsImg from "./img/conventionalcommits.png";
import packageLockImg from "./img/package-lock.png";
import npmImg from "./img/npm.png";
import npmBisImg from "./img/npm2.png";

const theme = {
  colors: {
    primary: "#ECECED",
    secondary: "#ffdc4e",
    darkBg: "#3E4047",
    yellow: "#ffdc4e",
  },
  fontSizes: {
    header: "64px",
    paragraph: "28px",
  },
};

function App() {
  return (
    <Deck theme={theme}>
      <Slide backgroundColor="darkBg">
        <Heading style={{ height: "30%", margin: "auto" }}>
          Package management
        </Heading>
        <Image
          src={npmImg}
          alt="npm"
          style={{ display: "block", width: "45%", margin: "0 auto" }}
        />
      </Slide>
      <Slide backgroundColor="darkBg">
        <Heading>Types of Dependencies</Heading>
        <UnorderedList>
          <Appear>
            <ListItem>
              <b>Dependencies</b>: deps required for package to run. <br />
              <i>i.e. React, apollo-server, @nestjs/core</i>
            </ListItem>
          </Appear>
          <Appear>
            <ListItem>
              <b>Dev dependencies</b>: deps required for package to build&test.{" "}
              <br />
              <i>i.e. Jest, Webpack, prettier</i>
            </ListItem>
          </Appear>
          <Appear>
            <ListItem>
              <b>PeerDependencies</b>: deps required that needs to be installed
              separately
              <br />
              <i>i.e. react-redux → react, @nestjs/core → @nestjs/testing</i>
            </ListItem>
          </Appear>
        </UnorderedList>
      </Slide>
      <Slide backgroundColor="darkBg">
        <Heading>Example:</Heading>
        <CodePane
          theme={material}
          fontSize={18}
          language="json"
          showLineNumbers={false}
        >
          {indentNormalizer(`
{
  "name": "@orderfoxag/webpack-random-plugin",
  "dependencies": {
    "lodash-es": "^4.17.15"
  },
  "devDependencies": {
    "jest": "^27.2.5",
    "webpack": "^5.35.0"
  },
  // ⚠️ won't be installed (if npm < 7)
  "peerDependencies": {
    "webpack": "5.x"
  }
}
        `)}
        </CodePane>
      </Slide>
      <Slide backgroundColor="darkBg">
        <Heading>Dependencies requirements</Heading>
        <CodePane
          theme={material}
          fontSize={18}
          language="json"
          showLineNumbers={false}
        >
          {indentNormalizer(`
{
  "dependencies": {
    "foo": "1.0.0 - 2.9999.9999",
    "bar": ">=1.0.2 <2.1.2",
    "baz": ">1.0.2 <=2.3.4",
    "boo": "2.0.1",
    "qux": "<1.0.0 || >=2.3.1 <2.4.5 || >=2.5.2 <3.0.0",
    "asd": "http://asdf.com/asdf.tar.gz",
    "til": "~1.2",
    "elf": "~1.2.3",
    "two": "2.x",
    "thr": "3.3.x",
    "lat": "latest",
    "dyl": "file:../dyl"
  }
}
        `)}
        </CodePane>
      </Slide>
      <Slide backgroundColor="darkBg">
        <Heading>SEMVER - SEMantic VERsioning</Heading>
        <Heading>
          <span style={{ color: "#FF7070" }}>1</span>
          <span style={{ color: "#ECECED" }}>.</span>
          <span style={{ color: "#FF8F00" }}>2</span>
          <span style={{ color: "#ECECED" }}>.</span>
          <span style={{ color: "#90FF70" }}>3</span>
          <span style={{ color: "#E970FF" }}>-beta1</span>
        </Heading>
        <UnorderedList>
          <ListItem>
            <span style={{ color: "#FF7070" }}>
              <b>major</b>
            </span>
            : any breaking changes (NOT safe to update)
          </ListItem>
          <ListItem>
            <span style={{ color: "#FF8F00" }}>
              <b>minor</b>
            </span>
            : new features (safe to update)
          </ListItem>
          <ListItem>
            <span style={{ color: "#90FF70" }}>
              <b>patch</b>
            </span>
            : bug fix (safe to update)
          </ListItem>
          <ListItem>
            <span style={{ color: "#E970FF" }}>
              <b>optional label</b>
            </span>
            : for prerelease, alphas, betas...
          </ListItem>
        </UnorderedList>
      </Slide>
      <Slide backgroundColor="darkBg">
        <Heading>🤔 What about...</Heading>
        <Text>refactors, CI, documentation, performances, tests</Text>
        <Text>👉 should NOT trigger a bump!</Text>
      </Slide>
      <Slide backgroundColor="darkBg">
        <Heading>package-lock.json</Heading>
        <Text>It's a snapshot for installed dependencies.</Text>
      </Slide>
      <Slide backgroundColor="darkBg">
        <Heading>
          Should we commit <br /> package-lock.json?
        </Heading>
        <Heading>Yes.</Heading>
        <Image
          src={packageLockImg}
          alt="Conventional commits"
          style={{ width: "40%", margin: "0 auto" }}
        />
      </Slide>
      <Slide backgroundColor="darkBg">
        <Heading>package-lock.json and installation</Heading>
        <Text>
          🐌 npm install: install deps, rewrite/update lockfile if needed
        </Text>
        <Text>🏎 npm ci: install deps, lockfile is readonly</Text>
      </Slide>
      <Slide backgroundColor="darkBg">
        <Heading>Focus: Module resolution</Heading>
        <Appear>
          <CodePane
            theme={material}
            fontSize={18}
            language="bash"
            showLineNumbers={false}
          >
            {indentNormalizer(`
Given A{B,C}, B{C}, C{D}

A
├── B
├── C
└── D
          `)}
          </CodePane>
        </Appear>
        <Appear>
          <CodePane
            theme={material}
            fontSize={18}
            language="bash"
            showLineNumbers={false}
          >
            {indentNormalizer(`
Given A{B,C}, B{C,D@1}, C{D@2}

A
├── B
├── C
│   └── D@2
└── D@1
          `)}
          </CodePane>
        </Appear>
      </Slide>
      <Slide backgroundColor="darkBg">
        <Heading>
          🙏 Please keep your dependencies list as small as possible
        </Heading>
        <Image
          src="https://www.maxpou.fr/62eb663cdadf201882b8193e73bbf48e/package-json-haha.gif"
          alt="package.json too big"
          style={{ display: "block", width: "45%", margin: "0 auto" }}
        />
      </Slide>

      <Slide backgroundColor="darkBg">
        <Heading>Package deployment</Heading>
        <Image
          src={npmBisImg}
          alt="npm"
          style={{ display: "block", width: "40%", margin: "0 auto" }}
        />
      </Slide>
      <Slide backgroundColor="darkBg">
        <Heading>Option 1: CLI</Heading>
        <CodePane
          theme={material}
          fontSize={18}
          language="bash"
          showLineNumbers={false}
        >
          {indentNormalizer(`
$ npm login
> Username: maxpou
> Password: ********
> Email: (this IS public) maxence.p*****@gmail.com

$ npm version minor --no-git-tag-version
v1.0.0

$ npm publish
npm notice === Tarball Details === 
npm notice name:          @orderfoxag/reference-data
npm notice version:       1.0.0
npm notice filename:      @orderfoxag/reference-data-1.0.0.tgz
npm notice package size:  76.9 kB
npm notice unpacked size: 445.1 kB
npm notice shasum:        b6a553473081cfeb29a966240abd0681e4fbec1c
npm notice integrity:     sha512-cATZ0btxBlk7Z[...]aVsuQHKoAZagg==
npm notice total files:   43
npm notice Publishing to https://npm.pkg.github.com/
+ @orderfoxag/reference-data@1.0.0
          `)}
        </CodePane>
      </Slide>
      <Slide backgroundColor="darkBg">
        <Heading>Option 2: Conventional commits</Heading>
        <Image
          src={conventionalcommitsImg}
          alt="Conventional commits"
          style={{ width: "70%", margin: "0 auto" }}
        />
      </Slide>
      <Slide backgroundColor="darkBg">
        <Heading>Option 3: GitHub Actions</Heading>
      </Slide>
      {/* <Slide backgroundColor="darkBg">
        <Heading>REST Architectural Style</Heading>
        <Image src={rmmImg} alt="Richardson Maturity Model" style={{width: '70%', margin: '0 auto'}}/>
      </Slide>
      <Slide backgroundColor="darkBg">
        <Heading>LEVELS 0, 1 AND 2</Heading>
        <UnorderedList>
          <ListItem>Resource unicity</ListItem>
          <ListItem>Client use HTTP verbs</ListItem>
          <ListItem>Server use HTTP codes</ListItem>
          <ListItem>Content negotiation <br/>
          ➡ Use media types to describe WHAT is expect
          </ListItem>
        </UnorderedList>
      </Slide>
      <Slide backgroundColor="darkBg">
        <Heading>LEVEL 3: HATEOAS</Heading>
        <UnorderedList>
          <ListItem><em><b>H</b>ypertext <b>A</b>s <b>T</b>he <b>E</b>ngine <b>O</b>f <b>T</b>he <b>A</b>pplication <b>S</b>tate</em></ListItem>
          <ListItem>Resources are self-describing (discoverability) <br/>
          ➡ Use links to describe HOW the service is used</ListItem>
          <ListItem>Hypermedia formats (e.g., HAL, JSON-LD, HYDRA)</ListItem>
        </UnorderedList>
      </Slide>
      <Slide backgroundColor="darkBg">
        <Heading>LEVEL 3: HATEOAS</Heading>
        <CodePane
          theme={material}
          fontSize={18}
          language="json"
          showLineNumbers={false}
        >
        {indentNormalizer(`
{
  "id": "66",
  "title": "My order",
  "description": "My order description",
  "_links": {
    "self": {
      "href": "/orders/66"
    },
    // if I can't quote, there's no link!
    "quote": {
      "href": "/orders/66/quote",
    },
    "company": {
      "href": "/companies/5/"
    }
  }
}
        `)}
        </CodePane>
      </Slide>
      <Slide backgroundColor="darkBg">
        <Heading style={{ margin: 0 }}>REST</Heading>
        <Text style={{margin: 0, padding: 0}}>Pros:</Text>
        <UnorderedList>
          <ListItem>👍 cache consistency (idempotent/safe HTTP method)</ListItem>
          <ListItem>👍 loose coupling</ListItem>
        </UnorderedList>
        <Text style={{margin: 0, padding: 0}}>Cons:</Text>
        <UnorderedList>
          <ListItem>👎 Heavier response</ListItem>
          <ListItem>👎 No "multi-GET"</ListItem>
          <ListItem>👎 Clients need to understand what links are about</ListItem>
          <ListItem><small> 👎 ...nobody understand REST! (...and it's ok)</small></ListItem>
        </UnorderedList>
      </Slide>
      <Slide backgroundColor="darkBg">
        <Heading style={{ margin: 0 }}>HTTP API™</Heading>
        <Text style={{margin: 0, padding: 0}}>Pros:</Text>
        <UnorderedList>
          <ListItem>👍 cache consistency (idempotent/safe HTTP method)</ListItem>
          <ListItem>👍 easy way to communicate between back&front</ListItem>
        </UnorderedList>
        <Text style={{margin: 0, padding: 0}}>Cons:</Text>
        <UnorderedList>
          <ListItem>👎 Documentation</ListItem>
          <ListItem>👎 "multi-GET" / loose coupling tradeoff</ListItem>
        </UnorderedList>
      </Slide>
      <Slide backgroundColor="darkBg">
        <Heading>GraphQL</Heading>
        <Image src={graphqllogoImg} alt="GraphQL logo" style={{width: '30%', margin: '0 auto'}}/>
      </Slide>
      <Slide backgroundColor="darkBg">
        <Heading>🖇 Model 101</Heading>
        <CodePane
        fontSize={18}
        theme={material}
        language="graphql"
        showLineNumbers={false}
        autoFillHeight
        >
        {indentNormalizer(`
          type Order {
            title: String! # ! means required
            description: String
            company: Company
          }
          
          type Company {
            name: String!
            orders: [Order]
          }
        `)}
        </CodePane>
      </Slide>
      <Slide backgroundColor="darkBg">
        <Heading>🔎 Queries 101</Heading>
        <CodePane
          fontSize={18}
          language="graphql"
          theme={material}
          showLineNumbers={false}
          autoFillHeight
        >
        {indentNormalizer(`
          query GetOrdersAndCompanies {
            orders {
              title
              company {
                name
              }
            }
          }
        `)}
        </CodePane>
      </Slide>
      <Slide backgroundColor="darkBg">
        <Appear priority={2}><Heading>🥳 1 call, only fetch what's needed</Heading></Appear>
        <Appear priority={0}>
          <CodePane
            fontSize={18}
            language="graphql"
            showLineNumbers={false}
            theme={material}
          >
            {indentNormalizer(`
              HTTP GET /orders/5

              # then...
              HTTP GET /materials/1
              HTTP GET /materials/2
              HTTP GET /materials/3
            `)}
          </CodePane>
        </Appear>
        <Appear priority={1}>
          <CodePane
            fontSize={18}
            language="graphql"
            theme={material}
            showLineNumbers={false}
          >
            {indentNormalizer(`
              query getOrder {
                order(id: "5") {
                  title
                  materials {
                    name
                  }
                }
              }
            `)}
          </CodePane>
        </Appear>
      </Slide>
      <Slide backgroundColor="darkBg">
        <Heading>🚀 GraphQL in action</Heading>
        <Image src={beFeSchemaImg} alt="App Schema" style={{width: '30%', margin: '20px auto'}} />
        <Link style={{margin: '0 auto'}} href="https://github.com/maxpou/nest-react-graphql">github.com/maxpou/nest-react-graphql</Link>
      </Slide>
      <Slide backgroundColor="darkBg">
        <Heading>⚙️ Focus: Queries params</Heading>
        <CodePane
          fontSize={12}
          language="graphql"
          autoFillHeight
          theme={material}
          showLineNumbers={false}
        >
          {indentNormalizer(`
            query getOrder($id: ID!) {
              order(id: $id) {
                title
                quotes {
                  company {
                    name
                  }
                }
              }
            }
            # QUERY_VARIABLES
            {
              "id": "60"
            }
          `)}
        </CodePane>
      </Slide>
      <Slide backgroundColor="darkBg">
        <Heading>💡 Focus: Directives</Heading>
        <CodePane
          fontSize={18}
          theme={material}
          language="ts"
          showLineNumbers={false}
          autoFillHeight
        >
        {indentNormalizer(`
        directive @deprecated(
          reason: String = "No longer supported"
        ) on FIELD_DEFINITION | ENUM_VALUE

        type Order {
          id: ID!
          orderId: String! @deprecated(reason: "Use \`id\` instead.")
          # ...
        }
        `)}
        </CodePane>
      </Slide>
      <Slide backgroundColor="darkBg">
        <Heading>😕 Caching</Heading>
        <UnorderedList>
          <Text>⚠️ Incompatible with:</Text>
          <ListItem>browser caching <small>(i.e service workers)</small></ListItem>
          <ListItem>reverse proxy <small>(i.e varnish)</small></ListItem>
        </UnorderedList>
        <Appear>
          <Text>... we always query the same endpoint <small>(https://myapi.com/graphql)</small></Text>
        </Appear>
        <Appear><Text>...But...</Text></Appear>
      </Slide>
      <Slide backgroundColor="darkBg">
        <Heading>🧠 Focus: Caching (FE w/ Apollo)</Heading>
        <Text margin={0}>Support fetch policy on the query level (cache first, network only...)
        <br />
        Internal cache out of the box</Text>
        <CodePane
          fontSize={12}
          language="graphql"
          showLineNumbers={false}
          // highlightRanges={[1, 3]}
          theme={material}
        >
          {indentNormalizer(`
          # will auto-update cache
          mutation {
            UpdateOrder(id: 3, name: "Updated order") { ... }
          }
          query {
            order(id: 3) {
              name
            }
          }
          `)}
        </CodePane>
      </Slide>
      <Slide backgroundColor="darkBg">
        <Heading>🧠 Focus: Caching (BE)</Heading>
        <CodePane
          fontSize={18}
          language="graphql"
          theme={material}
          showLineNumbers={false}
        >
          {indentNormalizer(`
            type Order {
              id: ID!
              title: String

              # maxAge: 30 => 30s
              quotes: [Quote!] @cacheControl(maxAge: 30)
              
              # PRIVATE => depends on the curent user logged in
              orderUnlockedByCurrentUser: Boolean! @cacheControl(maxAge: 10, scope: PRIVATE)
            }
          `)}
        </CodePane>
        <Text>❓ Can also be done dynamically in your NestJS resolver</Text>
      </Slide>
      <Slide backgroundColor="darkBg">
        <Heading>🤯 Focus: Preventing malicious querying</Heading>
        <CodePane
          fontSize={18}
          theme={material}
          language="graphql"
          showLineNumbers={false}
        >
        {indentNormalizer(`
query maliciousQuery {
  company(id: "some-id") {
    quotes(first: 99999) {
      company {
        quotes(first: 99999) {
          company {
            # ...repeat times 10000...
          }
        }
      }
    }
  }
}
        `)}
        </CodePane>
        <Link href="https://github.com/4Catalyzer/graphql-validation-complexity">👉 github.com/4Catalyzer/graphql-validation-complexity</Link>
      </Slide>
      <Slide backgroundColor="darkBg">
        <Heading>📚 Reading</Heading>
        <UnorderedList>
          <ListItem>
            <Link style={{margin: '0 auto'}} href="https://spec.graphql.org/October2021/">
              GraphQL spec
            </Link>
          </ListItem>
          <ListItem>
            <Link style={{margin: '0 auto'}} href="https://www.apollographql.com/docs/react/data/operation-best-practices/">
              GraphQL query best practices (apollographql.com)
            </Link>
          </ListItem>
        </UnorderedList>
      </Slide> */}
    </Deck>
  );
}
export default App;
