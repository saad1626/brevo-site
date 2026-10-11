// components/PageHero.jsx
// The grey area at the top of the Blog, About and Contact pages.
// Whatever you put between <PageHero> and </PageHero> shows under the title.

function PageHero(props) {
  return (
    <section className="page-hero">
      <div className="container page-hero-inner">
        <h1>{props.title}</h1>
        {props.children && <div className="page-hero-text">{props.children}</div>}
      </div>
    </section>
  );
}

export default PageHero;
