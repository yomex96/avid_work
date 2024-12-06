import AnimatedUnderline from "./AnimatedUnderline";

const AboutUs = () => {
  return (
    <div className="flex flex-col text-center md:flex-row gap-8 py-10 px-4 md:px-30">
      <div className="md:ml-32 mb-6 md:mb-0">
        <AnimatedUnderline>
          <h1 className="font-bold text-2xl md:text-3xl">About Us</h1>
        </AnimatedUnderline>
        <p className="text-base md:text-lg">
          Get to know who we are and what we do.
        </p>
      </div>

      <div className="flex flex-col md:text-start flex-1 md:mr-32">
        <p className="text-sm md:text-base">
          At Avid Studio, every moment tells a story. Whether it’s the quiet
          fondness of a glance or the joy of a celebration, our passion lies in
          capturing life’s most beautiful and fleeting moments. With a blend of
          creativity, technical expertise, and a keen eye for detail, we
          transform your occasions into timeless memories. From portraits and
          events to landscapes and lifestyle photography, our mission is to
          deliver stunning and distinct images that reflect your unique story.
          Let us help you preserve the moments that matter most.
        </p>
        <br />
        {/* <p className="text-sm md:text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis
          facilis, voluptatibus harum quos libero eligendi vitae, in voluptate
          cum, numquam omnis autem ex quam sit modi tempore cupiditate
          assumenda. Alias esse voluptates sed ipsum placeat! Libero repudiandae
          vero iste quibusdam nostrum esse aut commodi incidunt, dignissimos,
          nulla tempora quas quod! Consectetur, soluta nobis quod quo nemo
          ipsam, aut voluptatem mollitia repellat quibusdam quasi at, impedit
          corrupti et consequuntur vel. Necessitatibus cumque enim, impedit
          veniam id debitis cum facere rem quaerat.
        </p> */}
      </div>
    </div>
  );
};

export default AboutUs;
