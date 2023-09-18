import RoundCheckIn from '@components/RoundCheckIn';
import { useRouter } from 'next/router';

const CheckIn = () => {
  const router = useRouter();
  const { matchId } = router.query;

  return (
    <>
      <RoundCheckIn matchId={matchId as string} />
    </>
  );
};

export default CheckIn;
