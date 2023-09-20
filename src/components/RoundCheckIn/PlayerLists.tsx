import Icon from '@components/Icon';
import { MatchPlayerScoreInfos } from '@components/RoundCheckIn';
import styled from '@emotion/styled';

interface PlayerListsProps {
  players: MatchPlayerScoreInfos[];
  checkInUsers: number[];
}

const PlayerLists = ({ players, checkInUsers }: PlayerListsProps) => {
  return (
    <Container>
      <MenuList>
        <MenuItem>순위</MenuItem>
        <MenuItem>게임ID</MenuItem>
        <MenuItem>점수</MenuItem>
        <MenuItem>준비</MenuItem>
      </MenuList>
      {players.length !== 0 &&
        players.map((player) => (
          <MenuList key={player.matchPlayerId}>
            <MenuItem># {player.matchRank}</MenuItem>
            <MenuItem>{player.participantGameId}</MenuItem>
            <MenuItem>{player.playerScore}</MenuItem>
            <MenuItem>
              {checkInUsers.includes(player.matchPlayerId) ? (
                <Icon kind='checked' color='1975FF' size={24} />
              ) : (
                <Icon kind='notChecked' color='1975FF' size={24} />
              )}
            </MenuItem>
          </MenuList>
        ))}
    </Container>
  );
};

export default PlayerLists;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
`;

const MenuList = styled.ul`
  display: flex;
  height: 6rem;
  align-items: center;
  justify-content: space-between;
  font-size: 1.4rem;
  border: 1px solid #e4e7ec;
  border-radius: 0.5rem;
  padding: 1rem 0 1rem;
  margin-bottom: 0.5rem;
  background: #fff;

  &: first-of-type {
    color: #97a1af;
    margin-bottom: 1rem;
  }
`;

const MenuItem = styled.li`
  width: 5rem;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;
