import DashLayout from "@modules/layout/DashLayout";
import Statistica from "@modules/statistica";

const Home = () => {
  return (
    <DashLayout>
      <Statistica />
      <lord-icon
        src="https://cdn.lordicon.com/ihyatngg.json"
        trigger="hover"
        style={{
          width: "100px",
          height: "100px",
        }}
      ></lord-icon>
    </DashLayout>
  );
};

export default Home;
