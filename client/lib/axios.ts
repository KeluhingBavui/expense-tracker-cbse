import Axios from "axios";

export const axios = Axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/v1`,
  params: {
    userId: "43bde098-d450-47fe-b4d3-4a0f49d73e66",
  },
});
