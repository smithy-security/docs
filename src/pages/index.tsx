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
        <article className="col col--4 margin-bottom--lg">
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
            <div
                className="container container-fluid"

            >
                <section className="row margin-top--lg">
                    <DocsGroup
                        icon="/img/icons/how-to.png"
                        title="Smithy Open Source"
                        description="Learn about the Smithy Open-Source project."
                        href="/docs/category/oss"
                    />
                    <DocsGroup
                        icon="/img/icons/star.png"
                        title="Smithy SaaS"
                        description="Learn how to get the best of the premium Smithy SaaS."
                        href="/docs/category/saas"
                    />
                    <DocsGroup
                        icon="/img/icons/puzzle.png"
                        title="Components"
                        description="See which tools already integrate with Smithy."
                        href="/docs/reference/components/all"
                    />
                    <DocsGroup
                        icon="/img/icons/timer.png"
                        title="Quickstart"
                        description="Start using the Smithy Open-Source in 5 minutes."
                        href="/docs/oss/quickstart"
                    />
                    <DocsGroup
                        icon="/img/icons/pencil.png"
                        title="Write your own component"
                        description="Write your own integration with Smithy in 5 minutes."
                        href="/docs/oss/write-your-own-component"
                    />
                    <DocsGroup
                        icon="/img/icons/reference.png"
                        title="Reference"
                        description="Understand of the machinery and how to operate it."
                        href="/docs/category/reference"
                    />
                </section>
                <section className="row margin-top--lg">
                    <article className="col margin-bottom--lg" style={{ margin: "0 auto", textAlign: "center" }}>
                        <h2>
                            More questions?
                        </h2>
                        <p>If you have trouble finding what you need, we are here to help!<br/>Send us a message on <a href="mailto:questions@smithy.security">questions@smithy.security</a> and we'll get back to you shortly.</p>
                    </article>
                </section>
            </div>
        </Layout>
    );
}
