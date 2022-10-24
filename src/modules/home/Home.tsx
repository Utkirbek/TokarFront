import DashLayout from "@modules/layout/DashLayout";

const Home = () => {
  return (
    <DashLayout>
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
