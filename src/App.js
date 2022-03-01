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
  Notes,
  Link,
} from "spectacle";
import material from "react-syntax-highlighter/dist/esm/styles/prism/material-dark";

import conventionalcommitsImg from "./img/conventionalcommits.png";
import packageLockImg from "./img/package-lock.png";
import npmImg from "./img/npm.png";
import npmBisImg from "./img/npm2.png";
import pnpmImg from "./img/pnpm.jpeg";

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
        <Heading style={{ margin: "auto" }}>
          Package management with NPM
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
        <Heading>Long story short: managing dependencies is hard</Heading>
        <Text>🙏 Please think twice before adding a new dependency 🙏 </Text>
        <Image
          src="https://www.maxpou.fr/62eb663cdadf201882b8193e73bbf48e/package-json-haha.gif"
          alt="package.json too big"
          style={{ display: "block", width: "45%", margin: "0 auto" }}
        />
      </Slide>
      <Slide backgroundColor="darkBg">
        <Heading>Focus: What about pnpm?</Heading>
        <Image
          src={pnpmImg}
          alt="Conventional commits"
          style={{ width: "70%", margin: "0 auto" }}
        />
      </Slide>
      <Slide backgroundColor="darkBg">
        <Heading>Focus: What about Yarn (w/ PnP)?</Heading>

        <CodePane
          theme={material}
          fontSize={18}
          language="bash"
          showLineNumbers={false}
        >
          {indentNormalizer(`
├── .yarn
│   └── cache
│       │── react.npm.16.0-338864c-1.zip
│       └── webpack.npm.5.0-34c7815a3d-1.zip
├── package.json
└── yarn.lock
          `)}
        </CodePane>

        <UnorderedList>
          <ListItem>Idea is interesting since it simplify hoisting</ListItem>
          <ListItem>Same concept as composer (PHP)</ListItem>
          <ListItem>
            <Link href="https://p.datadoghq.eu/sb/d2wdprp9uki7gfks-c562c42f4dfd0ade4885690fa719c818?tpl_var_npm=%2A&tpl_var_pnpm=%2A&tpl_var_yarn-classic=%2A&tpl_var_yarn-modern=%2A&tpl_var_yarn-nm=%2A&tpl_var_yarn-pnpm=no&from_ts=1645551964461&to_ts=1646156764461&live=true">
              🏋️‍♀️ Benchmark npm vs. yarn
            </Link>
          </ListItem>
          <ListItem>
            Not as revolutionary as it looks - React/Webpack/etc. still use Yarn
            v1
          </ListItem>
        </UnorderedList>
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

# optional
$ npm version minor --no-git-tag-version
v1.0.0

$ npm publish
npm notice === Tarball Details === 
npm notice name:          @orderfoxag/reference-data
npm notice version:       1.0.0
npm notice filename:      @orderfoxag/reference-data-1.0.0.tgz
npm notice [xxx]
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
    </Deck>
  );
}
export default App;
