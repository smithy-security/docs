import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";

import styles from "./index.module.css";

function HomepageHeader() {
    const {siteConfig} = useDocusaurusContext();
    return (
        <header className={clsx("hero hero--primary", styles.heroBanner)}>
            <div className="container">
                <Heading as="h1" className="hero__title">
                    {siteConfig.title}
                </Heading>
                <p className="hero__subtitle">{siteConfig.tagline}</p>
            </div>
        </header>
    );
}

function DocsGroup({title, description, href, icon}) {
    return (
        <article className="col col--6 margin-bottom--lg">
            <a className="card padding--lg cardContainer_src-theme-DocCard-styles-module" href={href}>
                <h2 className="card-header cardTitle_src-theme-DocCard-styles-module" title={title}><img
                    src={icon} className="card-icon black-img"/><span>{title}</span></h2><p
                className="card-description cardDescription_src-theme-DocCard-styles-module"
                title={description}>{description}</p>
            </a>
        </article>
    );
}

export default function Home(): JSX.Element {
    const {siteConfig} = useDocusaurusContext();
    return (
        <Layout
            title={siteConfig.title}
            description="The official documentation for all things Smithy."
        >
            <HomepageHeader/>
            <main
                style={{
                    margin: "0 auto",
                    maxWidth: "767px",
                    padding: "var(--ifm-spacing-vertical) var(--ifm-spacing-horizontal)",
                    width: "100%",
                }}
            >
                <section className="row margin-top--lg">
                    <DocsGroup
                        icon="/img/icons/tutorials.png"
                        title="SaaS"
                        description="Learn about the Smithy SaaS"
                        href="/docs/category/saas"
                    />
                    <DocsGroup
                        icon="/img/icons/how-to.png"
                        title="OSS"
                        description="Learn about the Smithy OSS"
                        href="/docs/category/oss"
                    />
                    <DocsGroup
                        icon="/img/icons/reference.png"
                        title="Reference"
                        description="Information: Technical descriptions of the machinery and how to operate it."
                        href="/docs/category/reference"
                    />
                </section>
            </main>
        </Layout>
    );
}
