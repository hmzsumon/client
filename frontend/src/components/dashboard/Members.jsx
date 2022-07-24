import { useSelector } from 'react-redux';
import { RingLoader } from 'react-spinners';
import DashboardLayout from '../layouts/DashboardLayout';

const placements = [
  { title: 'A', value: 'a' },
  { title: 'B', value: 'b' },
  { title: 'C', value: 'c' },
  { title: 'D', value: 'd' },
  { title: 'E', value: 'e' },
];

const Members = () => {
  const { isGetUserLoading, updatedUser: user } = useSelector(
    (state) => state.auth
  );
  return (
    <DashboardLayout>
      {isGetUserLoading ? (
        <div className='flex items-center justify-center w-full h-screen'>
          <RingLoader color={'#36D7B7'} size={100} />
        </div>
      ) : (
        <div>
          <h1>Members: {user.totalMembers}</h1>
          <div>
            {placements.map((placement) => {
              return (
                <div key={placement.value}>
                  <h2>{placement.title}</h2>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Members;
