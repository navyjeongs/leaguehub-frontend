import authAPI from '@apis/authAPI';
import Button from '@components/Button';
import SelectGame from '@components/MakeChannel/SelectGame';
import SelectRule from '@components/MakeChannel/SelectRule';
import { MakeChannelStep } from '@constants/MakeGame';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import useChannels from '@hooks/useChannels';
import { ChannelCircleProps } from '@type/channelCircle';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface Props {
  handleModal: () => void;
}

const SelectChannelType = (props: Props) => {
  const { handleModal } = props;

  const channels = useChannels();

  const [currentModalStep, setCurrentModalStep] = useState<number>(MakeChannelStep['MakeOrJoin']);

  const [channelInput, setChannelInput] = useState<string>();

  const handleCurrentModalStep = (step: keyof typeof MakeChannelStep) => {
    setCurrentModalStep(MakeChannelStep[step]);
  };

  const fetchEnterNewChannel = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const res = await authAPI<ChannelCircleProps>({
        method: 'post',
        url: `/api/${channelInput}/participant/observer`,
      });

      const newChannel: ChannelCircleProps = {
        channelLink: res.data.channelLink,
        title: res.data.title,
        gameCategory: res.data.gameCategory,
        imgSrc: res.data?.imgSrc,
        customChannelIndex: res.data.customChannelIndex,
      };

      channels.addChannel(newChannel);
      handleModal();
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data.message);
      }
    }
  };

  const handleChannelInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChannelInput(e.target.value);
  };

  return (
    <Container>
      {currentModalStep === MakeChannelStep.MakeOrJoin && (
        <>
          <ModalTitle>채널 추가하기</ModalTitle>
          <ModalSubTitle>채널을 추가하고 시작해보세요!</ModalSubTitle>
          <Content>
            <BtnContainer>
              <BtnTitle>대회를 만들고 싶다면?</BtnTitle>
              <Button width={20} height={10} onClick={() => handleCurrentModalStep('SelectGame')}>
                대회 개최
              </Button>
            </BtnContainer>
            <BtnContainer>
              <BtnTitle>채널에 참여하고싶다면?</BtnTitle>
              <Button width={20} height={10} onClick={() => handleCurrentModalStep('JoinGame')}>
                채널 참여
              </Button>
            </BtnContainer>
          </Content>
        </>
      )}
      {currentModalStep === MakeChannelStep.SelectGame && (
        <SelectGame handleCurrentModalStep={handleCurrentModalStep} />
      )}

      {currentModalStep === MakeChannelStep.SettingRule && (
        <SelectRule handleCurrentModalStep={handleCurrentModalStep} />
      )}

      {currentModalStep === MakeChannelStep.JoinGame && (
        <>
          <ModalTitle>채널 참여하기</ModalTitle>
          <ModalSubTitle>채널에 참여하여 대회를 확인해보세요!</ModalSubTitle>
          <Content2>
            <FormConatiner>
              <ChannelForm onSubmit={fetchEnterNewChannel}>
                <ChannelInput required value={channelInput} onChange={handleChannelInput} />
                <Button width={10} height={4} type='submit'>
                  채널 참여
                </Button>
              </ChannelForm>
            </FormConatiner>
            <BtnContainer>
              <Button width={20} height={5} onClick={() => handleCurrentModalStep('MakeOrJoin')}>
                뒤로 가기
              </Button>
            </BtnContainer>
          </Content2>
        </>
      )}
    </Container>
  );
};

export default SelectChannelType;

const Container = styled.div`
  width: 50rem;
  max-height: 80rem;
  padding: 3rem;

  overflow-y: auto;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    width: 1rem;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #202b37;
    border-radius: 1rem;
  }
  ::-webkit-scrollbar-track {
    background-color: #344051;
    border-radius: 1rem;
  }
`;

const ModalTitle = styled.h1`
  font-size: 4rem;
  height: 7rem;
  line-height: 7rem;
`;

const ModalSubTitle = styled.div`
  font-size: 2.4rem;
  height: 4rem;
  line-height: 4rem;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 3rem;
  height: 20rem;
`;

const Content2 = styled.div`
  display: flex;
  flex-direction: column;
  column-gap: 3rem;
  height: 20rem;
`;

const BtnContainer = styled.div``;

const BtnTitle = styled.div`
  font-size: 1.5rem;
`;

const FormConatiner = styled.div`
  height: 40rem;
  display: flex;
  align-items: center;
`;

const ChannelForm = styled.form`
  width: 35rem;
  display: flex;
  margin: 0 auto;
  align-items: center;
  background-color: #ffffff;
`;

const ChannelInput = styled.input`
  width: 25rem;
  height: 5rem;
  border: none;

  background-color: #f1f0e8;

  border-radius: 1rem;

  color: #61677a;
`;
ChannelInput.defaultProps = { placeholder: '참여 코드 입력' };

export const fadeIn = keyframes`
    0% {
        opacity: 0;
        transform: translateY(10px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
`;
