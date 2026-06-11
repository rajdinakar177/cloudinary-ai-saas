import Mailgen from "mailgen";

const mailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "PixelForge AI",
    link: process.env.DOMAIN!,
  },
});

export default mailGenerator;