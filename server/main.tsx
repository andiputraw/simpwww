import { type Context, Hono } from "@hono/hono";
import { serveStatic } from "@hono/hono/deno";

import type { FC } from "@hono/hono/jsx";
import { markdownContents, type ContentMeta} from "~/generated/html.ts";
import { languageDetector } from "@hono/hono/language";
import { createContext, useContext } from "@hono/hono/jsx";
import { getDictLang } from "../lang/lang.ts";

const app = new Hono();

const emptyMeta: ContentMeta = {
  "title-en": "",
  "title-id": "",
  date: "-",
  tags: [],
  thumbnail: "",
}

class ReqCommonParams {
  constructor(public lang: "en" | "id", public url: URL, public meta: ContentMeta) {
    this.lang = lang;
    this.url = url;
    this.meta = meta;
  }

  static parse(c: Context): ReqCommonParams {
    const lang = c.get("language");
    const slug = c.req.param('slug')
    console.log(slug)
    
    const meta: ContentMeta = (slug) ? markdownContents.blog.meta[slug + ".json"] : (emptyMeta)

    return new ReqCommonParams(lang, new URL(c.req.url), meta);
  }

  /**
   * Get current title, will switch considering user prefered language
   */
  getMetaTitle(): string {
    return this.lang === 'en' ? this.meta["title-en"]  : this.meta["title-id"]
  }

  /**
   * Get current summary, will switch considering user prefered language
   * return undefined if prefered language is not found
   */
  GetMetaSummary(): string | undefined {
    return this.lang === 'en' ? this.meta["summary-en"] : this.meta["summary-id"]
  }

  

  static default(): ReqCommonParams {
    return new ReqCommonParams("en", new URL("https://wikipedia.com"), emptyMeta);
  }
}

const CommonParamContext = createContext(ReqCommonParams.default());

interface SiteData {
  c: Context;
  children?: unknown;
}

// Component

const Layout: FC = (props) => {
  const param = useContext(CommonParamContext);

  
  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="andiputraw" />
        <title>Andiputraw {param.getMetaTitle() === "" ? "" : `| ${param.getMetaTitle()}`}</title>

     

        {/* Open Graph */}
        <meta property="og:title" content={`${param.getMetaTitle()}`} />
        <meta property="og:description" content={param.GetMetaSummary() ?? "Summary for this page is unavailable"} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={param.url.toString() } />
        <meta property="og:image" content={param.meta.thumbnail !== "" ? `${param.url.protocol}//${param.url.host}/static/thumbnail/${param.meta.thumbnail}` : ""} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={param.getMetaTitle()} />
        <meta name="twitter:description" content={param.GetMetaSummary() ?? "Summary for this page is unavailable"} />
        <meta name="twitter:image" content={param.meta.thumbnail !== "" ? `${param.url.protocol}//${param.url.host}/static/thumbnail/${param.meta.thumbnail}` : ""} />

        {/* Syntax Highlighter */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/atom-one-dark.min.css"/>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/highlight.min.js"></script>
        <script>hljs.highlightAll();</script>

        <link rel="stylesheet" href="/static/output.css" />
        <link rel="stylesheet" href="/static/style.css" />
        <script type="module" defer={true} src="/static/script.js"></script>
        {/* <!-- Google tag (gtag.js) --> */}
        <script src="https://www.googletagmanager.com/gtag/js?id=G-1R0DRW43FS"></script>
        <script src="/static/analytic.js" ></script>
      </head>
      <body class="bg-neutral-800 text-white font-mono  ">
        <main class="h-full max-w-4xl m-auto  ">
          <Header />
          {props.children}
          <ContentHeader />
          <Footer />
        </main>
      </body>
    </html>
  );
};

const Header: FC = () => {
  return (
    <header class="bg-slate-700">
      <div class="flex justify-between items-center py-4 px-4 rounded-md mb-4">
        <h1 class="text-white text-xl font-light">A</h1>
        <div class="md:hidden">
          <button id="menu-toggle" class="text-white focus:outline-none">
            ☰
          </button>
        </div>

        <nav
          id="menu"
          class="hidden flex-col md:flex md:flex-row gap-4 text-white text-lg underline underline-offset-4"
        >
          <a class="hover:text-blue-400" href="/">Home</a>
          <a class="hover:text-blue-400" href="/blog">Blog</a>
          <a class="hover:text-blue-400" href="/about">About</a>
        </nav>
      </div>
      {/* Mobile sub-navbar */}
      <div id="menu-mobile" class="hidden bg-slate-800">
        <nav class="flex flex-col gap-4 p-2 text-white text-lg ">
          <a class="hover:text-blue-400" href="/">Home</a>
          <a class="hover:text-blue-400" href="/blog">Blog</a>
          <a class="hover:text-blue-400" href="/about">About</a>
        </nav>
      </div>
    </header>
  );
};

const Footer: FC = () => {
  return (
    <footer class="bg-slate-800 text-white mt-12">
      <div class="max-w-4xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
        <p>
          &copy; {new Date().getFullYear()} Andiputraw. All rights reserved.
        </p>

        <div class="flex gap-4">
          <a href="/about" class="hover:underline">About</a>
          {/* <a href="/contact" class="hover:underline">Contact</a> */}
          {/* <a href="/privacy" class="hover:underline">Privacy</a> */}
        </div>
      </div>
    </footer>
  );
};

const Home: FC = () => {
  const param = useContext(CommonParamContext);
  
  return (
    <>
      <section class="text-white flex-col flex gap-3 px-4 pb-16 md:pt-4">
        <h1 class="text-2xl sm:text-4xl font-bold" >
          { param.lang === 'en' ? "Andi Putra Wijaya" : "Andi Putra Wijaya"}
        </h1>
        <p>
          {param.lang === 'en' ? 
            <>I sometimes write something that i interest it in <a class="hover:text-blue-200 underline text-blue-500" href="/blog">blog</a>,  mostly about game and programming.</>: 
            <>Saya menulis sesuatu yang saya sukai di <a class="hover:text-blue-200 underline text-blue-500" href="/blog">blog</a>,  kebanyakan tentang game dan pemrograman.</>
          }
          
          
        </p>
        
        <p>
        {param.lang === 'en' ? 
            <>Read more about me in <a class="hover:text-blue-200 underline text-blue-500" href="/about">about me</a> page.</>: 
            <>Lihat lebih lanjut di halaman <a class="hover:text-blue-200 underline text-blue-500" href="/blog">about me</a></>
          }
          
          </p>
      </section>
      <section class="text-white text-xl flex-row flex gap-3  justify-evenly mt-12">
        {/* <div class="flex-col gap-3">
          <h1 class="text-2xl font-bold">Recent Post</h1>
        </div>
text-blue-200
        <div class="">
          <h1 class="text-2xl font-bold">Favorite Post</h1>
        </div> */}
      </section>
    </>
  );
};

const UnavailableLanguage: FC = () => {
  const param = useContext(CommonParamContext);
  const dict = getDictLang(param.lang)
  return (
    <>
      <div class="h-full flex justify-center">
        <div>

        <h1 class="text-xl text-center">{dict.UNAVAILABLE_LANG_HEAD}</h1>
        <p class="text-center">{dict.UNAVAILABLE_LANG_P}</p>
        </div>
      </div>
    </>
  )
}

const Blog: FC<{ slug: string }> = (props) => {
  const param = useContext(CommonParamContext);

  const content = {
    __html: param.lang === "id"
      ? markdownContents.blog.id[props.slug + ".md"]
      : markdownContents.blog.en[props.slug + ".md"]
  };

  if (!content.__html) {
    return <UnavailableLanguage/> 
  }

  const meta = markdownContents.blog.meta[props.slug + ".json"]

  
  return (
    <>
    <div class="mx-auto px-4 pb-16 md:pt-8">

      <div class="py-4 border-b-2">
        <img class="rounded " src={`/static/thumbnail/${meta.thumbnail}`} alt="" />
        <h1 class="text-4xl sm:text-6xl font-bold my-8">{param.lang === 'en' ? meta["title-en"] : meta["title-id"]}</h1>
      </div>
      <section
        class="mt-4"
        id="md-content"
        dangerouslySetInnerHTML={content}
        />
        </div>
    </>
  );
};

const BlogList: FC = () => {
  let meta = Object.entries(markdownContents.blog.meta);
  const tagLists = new Set(meta.map(([_, val]) => val.tags).flat());

  const param = useContext(CommonParamContext);
  const tagFilter = param.url.searchParams.get("tag");

  if (tagFilter) {
    meta = meta.filter(([_, val]) => val.tags.indexOf(tagFilter) !== -1);
  }
  

  return (
    <>
      <div class="flex gap-2">
        {tagLists.keys().map((v) => v).toArray().map((v) => (
          <div class="py-1 px-2 border-1 rounded-sm">
            <p class="blog-tags cursor-pointer hover:text-blue-400 ">{v}</p>
          </div>
        ))}
      </div>
      <div class="grid md:grid-cols-2 grid-cols-1 gap-6">
        {meta.map(([key, value]) => (
          <a href={"/blog/" + key.split(".").shift()}>
            <div class="flex flex-col gap-4 rounded-lg overflow-hidden p-4">
              {/* Thumbnail */}
              <div class="overflow-hidden rounded-lg">
                <img
                  class="w-full h-full object-cover object-center"
                  src={`static/thumbnail/${value.thumbnail}`}
                  alt={`${key}'s thumbnail`}
                  width={320}
                  height={180}
                  loading="lazy"
                />
              </div>

              <div class="flex flex-col justify-between overflow-hidden">
                <h2 class="text-xl font-semibold text-white truncate">
                  {param.lang === 'en' ? value["title-en"] : value["title-id"]}
                </h2>
                <p class="text-[14px] text-gray-300">
                  {(param.lang === 'en' ? value["summary-en"] : value["summary-id"])}
                </p>
                <p class="pt-2 text-[12px] text-gray-300 truncate">
                  {value.tags.join(", ")} | {value.date} | {key.split(".").shift() + ".md" in markdownContents.blog.id ? "ID ": ""} 
                  {key.split(".").shift() + ".md" in markdownContents.blog.en ? "EN ": ""}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </>
  );
};

const ContentHeader: FC = () => {
  const param = useContext(CommonParamContext);

  const Selector = () => {
    return (
      <>
        {[["🇮🇩", "id"], ["🇬🇧", "en"]].map((v) => (
          <option value={v[1]} selected={param.lang === v[1]}>
            {v.join(" ")}
          </option>
        ))}
      </>
    );
  };

  return (
    <>
      <div class="fixed bottom-4 right-4 z-50" id="language">
        <select
          id="lang-selector"
          class="px-3 py-2 rounded-md border border-gray-300 bg-black text-white text-sm shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <Selector />
        </select>
      </div>
    </>
  );
};

const About: FC = () => {
  const param = useContext(CommonParamContext);

  const content = {
    __html: param.lang === "id"
      ? markdownContents["about-id.md"]
      : markdownContents["about-en.md"],
  };
  return (
    <>
      <section
        class=""
        id="md-content"
        dangerouslySetInnerHTML={content}
      />
    </>
  );
};

// routes

app.use("/static/*", serveStatic({ root: "./" }));
app.use(
  languageDetector({
    supportedLanguages: ["en", "id"], // Must include fallback
    fallbackLanguage: "en", // Required
  }),
);
app.get("/", (c) => {
  return c.html(
    <CommonParamContext.Provider value={ReqCommonParams.parse(c)}>
      <Layout>
        <Home></Home>
      </Layout>
    </CommonParamContext.Provider>,
  );
});

app.get("/blog", (c) => {
  return c.html(
    <CommonParamContext.Provider value={ReqCommonParams.parse(c)}>
      <Layout>
        <BlogList></BlogList>
      </Layout>
    </CommonParamContext.Provider>,
  );
});

app.get("/blog/:slug", (c) => {
  return c.html(
    <CommonParamContext.Provider value={ReqCommonParams.parse(c)}>
      <Layout>
        <Blog slug={c.req.param("slug")}></Blog>
      </Layout>
    </CommonParamContext.Provider>,
  );
});

app.get("/about", (c) => {
  return c.html(
    <CommonParamContext.Provider value={ReqCommonParams.parse(c)}>
      <Layout>
        <About></About>
      </Layout>
    </CommonParamContext.Provider>,
  );
});

export default app;
