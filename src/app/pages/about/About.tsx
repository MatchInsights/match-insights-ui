const About = () => {
  return (
    <section className="bg-brand-darkBg text-brand-lightGray px-6 py-12 md:px-16 lg:px-32 w-full">
      <div className="max-w-5xl mx-auto text-center md:text-left">
        <h2
          data-testid="header-0"
          className="text-3xl md:text-4xl font-bold text-brand-yellow mb-8"
        >
          About This App
        </h2>
        <p data-testid="text-0" className="text-xl leading-relaxed mb-6">
          This Football App is designed for passionate fans who want to stay
          connected to the game they love anytime, anywhere. From thrilling live
          matches to deep dives into past performances, the app offers a
          complete football experience. Follow your favourite teams, explore
          match histories, and keep up with the latest scores and standings as
          they unfold. Whether you're watching from the stands or catching up on
          the go, this app brings the excitement, drama, and spirit of football
          straight to your fingertips. With a focus on clarity, speed, and ease
          of use, it’s your perfect companion for every season.
        </p>
        <h2
          data-testid="header-1"
          className="text-3xl md:text-4xl font-bold text-brand-yellow mb-8"
        >
          Our Mission
        </h2>
        <p data-testid="text-1" className="text-xl leading-relaxed mb-6">
          The heart of this project is all about making the world of football
          easier to explore and more enjoyable to experience. We believe that
          every fan should have quick access to the stories behind the scores
          from a team’s recent form to memorable matchups and league standings.
          That’s why we’ve focused on presenting the game’s rich details in a
          clear, engaging, and visually appealing way. Whether you're curious
          about today’s match or reliving historic rivalries, the app brings
          everything together in one seamless experience designed with fans in
          mind.
        </p>
        <h2
          data-testid="header-2"
          className="text-3xl md:text-4xl font-bold text-brand-yellow mb-8"
        >
          Built for Every Fan, Everywhere
        </h2>
        <p data-testid="text-2" className="text-xl leading-relaxed mb-6">
          This app is designed to fit seamlessly into your life, whether you're
          checking scores on your phone during a commute, browsing match history
          on a tablet, or diving into league tables from your laptop. No matter
          the device, the experience remains smooth, fast, and easy to use. And
          we’re just getting started. As the game evolves, so will the app. With
          exciting new features on the horizon, including deeper insights into
          player performances, side-by-side team comparisons, and even match
          predictions to keep fans one step ahead.
        </p>
      </div>
    </section>
  );
};

export default About;
