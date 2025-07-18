import { Link } from 'react-router-dom';
import Container from '../Container/Container';

const HomePage = () => {
  return (
    <Container>
      <div
        className="flex min-h-screen flex-col items-center justify-center p-6"
        style={{
          backgroundImage: `url('/images/food-2.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Link
          to="/recipeshome/home"
          className="rounded-4xl border-t-3 border-b-3 bg-emerald-900/70 px-5 py-3 text-[50px] text-white transition hover:scale-[1.1] hover:bg-emerald-900/50 hover:shadow-[0px_0px_10px_10px_rgba(16,185,129,0.5)]"
        >
          If you're hungry, don't even come here....
        </Link>
      </div>
    </Container>
  );
};

export default HomePage;
