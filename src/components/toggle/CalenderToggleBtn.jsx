import { styled } from 'styled-components/native';
import { COLORS } from '../../constants/color';
function CalenderToggleBtn({isActive, setIsActive}) {

    // const [isActive, setIsActive] = useState(true);

    const handleToggle = () => {
      console.log('isActive',isActive)
      setIsActive(!isActive);
    };

    return (
   
        <ToggleContainer isActive={isActive}onPress={handleToggle}>
            <ToggleBoxContainer>

        {
            isActive ?   <InnerText>주</InnerText> : null
        }

        <ToggleBall isActive={isActive}>
            <BallText isActive={isActive}>{isActive ? '월' : '주'}</BallText>
        </ToggleBall>

        {
            !isActive ?  <InnerText isActive={isActive}>월</InnerText> : null
        }
            </ToggleBoxContainer>
      </ToggleContainer>

    );
}

export default CalenderToggleBtn;

const ToggleContainer = styled.TouchableOpacity`
  width: 80px;
  height: 36px;
  background-color: ${COLORS.gray_100};
  border-radius: 34px;
  justify-content: center;
  align-items: ${(props) => (props.isActive ? 'flex-end' : 'flex-start')};
  padding: 3px;
`;

const ToggleBall = styled.View`
  width: 32px;
  height: 32px;
  border-radius: 100px;
  background-color: ${COLORS.box_two};
  justify-content: center;
  align-items: center;
`;

const BallText = styled.Text`
    color: ${COLORS.white};
    font-size: 14px;
font-weight: 500;
line-height: 22.40px;
`

const ToggleBoxContainer = styled.View`
  flex-direction: row;
  align-items: center;
  /* background-color: red; */
  justify-content: space-around;
    width: 100%;    
  `

  const InnerText = styled.Text`
    font-size: 14px;
    font-weight: 500;
    line-height: 22.40px;
    color: ${COLORS.gray_400};
    margin-left: ${(props) => (props.isActive ? '0px' : '8px')};
    margin-right: ${(props) => (props.isActive ? '0px' : '8px')};
  `