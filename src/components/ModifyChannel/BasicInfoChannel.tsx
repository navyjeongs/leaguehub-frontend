import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useRef } from 'react';
import authAPI from '@apis/authAPI';

interface BasicInfoChannelProps {
  channelLink: string;
  leagueTitle: string;
  maxPlayer: number;
}

const BasicInfoChannel = ({ channelLink, leagueTitle, maxPlayer }: BasicInfoChannelProps) => {
  const leagueTitleRef = useRef<HTMLInputElement>(null);
  const maxPlayerRef = useRef<HTMLInputElement>(null);

  const onClickSubmit = async () => {
    console.log(leagueTitleRef.current?.value, maxPlayerRef.current?.value);
    if (!leagueTitleRef.current || !maxPlayerRef.current) return;
    const updatedLeagueTitle = leagueTitleRef.current.value;
    const updatedMaxPlayer = parseInt(maxPlayerRef.current.value, 10);
    if (isNaN(updatedMaxPlayer)) {
      alert('최대인원수를 숫자로 입력해주세요');
      return;
    }
    if (!confirm('리그를 수정하시겠습니까?')) return;
    const res = await authAPI({
      method: 'post',
      url: `/api/channel/${channelLink}`,
      data: {
        title: updatedLeagueTitle,
        maxPlayer: updatedMaxPlayer,
      },
    });
    if (res.status !== 200) return;
    alert('정보가 수정되었습니다');
  };

  return (
    <Container>
      <Header>리그 수정하기</Header>
      <Content>
        <Wrapper>
          <FlexWrapper>리그 제목</FlexWrapper>
          <FlexWrapper>
            <Input
              type='text'
              placeholder='리그 제목을 입력해주세요'
              ref={leagueTitleRef}
              defaultValue={leagueTitle}
            />
          </FlexWrapper>
        </Wrapper>
        <Wrapper>
          <FlexWrapper>최대 인원</FlexWrapper>
          <FlexWrapper>
            <Input
              type='text'
              placeholder='최대 인원을 설정해주세요'
              ref={maxPlayerRef}
              defaultValue={maxPlayer}
            />
          </FlexWrapper>
        </Wrapper>
      </Content>

      <ButtonWrapper>
        <SubmitButton onClick={onClickSubmit}>수정하기</SubmitButton>
      </ButtonWrapper>
    </Container>
  );
};

export default BasicInfoChannel;

const Container = styled.div`
  margin: 2rem 4rem;
`;
const Header = styled.div`
  text-align: left;

  font-size: 3rem;
  font-weight: 900;
  color: white;
`;

const Content = styled.div``;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem;
  font-size: 1.7rem;
  font-weight: bold;
  min-height: 7rem;
`;

const FlexWrapper = styled.div`
  color: white;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  font-weight: bold;
  font-size: 1.8rem;
`;

const Input = styled.input`
  width: 80%;
  height: 4rem;
  border: none;
  border-radius: 0.6rem;
  padding: 0.6rem;
`;

const SubmitButton = styled.button`
  width: 10rem;
  height: 6rem;
  background-color: #344051;
  border: none;
  border-radius: 0.5rem;
  color: white;
  margin: 0 6rem 0 6rem;
  &:hover {
    cursor: pointer;
  }
  &:disabled {
    background-color: #d3d3d3;
    cursor: not-allowed;
  }
`;
