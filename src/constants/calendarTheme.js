import { COLORS } from "./color";

export const themeStyled = {
        calendarBackground: COLORS.white,
        textSectionTitleColor: COLORS.gray_300,
        selectedDayBackgroundColor: COLORS.white,
        selectedDayTextColor: COLORS.gray_400,
        todayTextColor: COLORS.gray_sub,
        dayTextColor: COLORS.gray_400,
        textDisabledColor: 'transparent',
        dotColor: '#FF7A00',
        // selectedDotColor: '#FF7A00',
      //   arrowColor: COLORS.white,
      //   disabledArrowColor: COLORS.sub,
        monthTextColor: COLORS.sub,
        indicatorColor: COLORS.sub,

        textDayFontFamily: 'NotoSansKR-Regular',
        textMonthFontFamily: 'NotoSansKR-Regular',
        textDayHeaderFontFamily: 'NotoSansKR-Regular',
        textDayFontWeight: '500',
        textMonthFontWeight: '500',
        textDayHeaderFontWeight: '500',
        textDayFontSize: 16,
        textMonthFontSize: 16,
        textDayHeaderFontSize: 14,
        dotStyle:{
          marginTop: 9,
          zIndex: 999,
        },
        textDayStyle: {
          zIndex: 999,
        },
        // expandableKnobColor:COLORS.gray_200,
        stylesheet: {    
          expandable: {
            main: {
              knobContainer: {
                position: 'absolute',
                left: 0,
                right: 0,
                height: 12,
                bottom: 0,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.white,
                },
                knob: {
                  width: 40,
                  height: 4,
                  borderRadius: 3,
                  backgroundColor: COLORS.gray_200,
                },
                weekCalendar: {
                  // marginTop: 20, 
                  marginBottom: 4
                },
                week: {
                  marginTop: 14,
                  marginBottom: 14,
                  paddingRight: 15,
                  paddingLeft: 15,
                  flexDirection: 'row',
                  justifyContent: 'space-around'
                },
            },
          },
        },
  };