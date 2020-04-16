import React from 'react';
import{
  View,
  Text,
  StyleSheet
} from 'react-native';
import Chatbox from 'react-native-chatbot';

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
   

  },
  text: {
    fontSize: 25
  }
});

const steps = [
  {
    id: '1',
    message: 'Hi its Elvis. Thanks for choosing me as your virtual tour guide. I will make sure you get to experience this town in the most unique was. ',
    trigger: '2'
  },
  {
    id: '2',
    message: 'Lets get started?',
    trigger: '3'
  },
  {
    id: '3',
    user: true,
    trigger: '4'
  },
  {
    id: '4',
    message: 'Here are the initial categories you can choose from and I will start providing some recomendations. Start by selecting one from this list.',
    trigger: '5'
  },
  {
    id: '5',
    options:[
      {value:'Restaurants', label: 'Restaurants', trigger: '6'},
      {value:'Activities', label: 'Activities', trigger: '15'},
      {value:'Bar & Live music', label: 'Bar & Live music', trigger: '21'},
      {value:'Shopping', label: 'Shopping', trigger: '22'}
    ] 
  },
  {
    id: '6',
    message:'What are you craving?',
    trigger: '7'
  },
  {
    id: '7',
    options:[
      {value:'Pizza', label: 'Pizza', trigger: '11'},
      {value:'Burger', label: 'Burger', trigger: '12'},
      {value:'Asian', label: 'Asian', trigger: '13'},
      {value:'Mediterranean', label: 'Mediterranean', trigger: '14'}
    ] 
  },
  {
    id: '11',
    message:'Here are top Pizza places',
    end: true
  },
  {
    id: '12',
    message:'Here are top Burger places',
    end: true
  },
  {
    id: '13',
    message:'Here are top Asian places',
    end: true
  },
  {
    id: '14',
    message:'Here are top Mediterranean places',
    end: true
  },
  {
    id: '15',
    message:'What are you in the mood for?',
    trigger: '16'
  },
  {
    id: '16',
    options:[
      {value:'Sports', label: 'Sports', trigger: '17'},
      {value:'Museums', label: 'Museums', trigger: '18'},
      {value:'Casual', label: 'Casual', trigger: '19'},
      {value:'Outdoor', label: 'Outdoor', trigger: '20'}
    ] 
  },
  {
    id: '17',
    message:'Here are local sporting events',
    end: true
  },
  {
    id: '18',
    message:'Here are some local Museums',
    end: true
  },
  {
    id: '19',
    message:'Here are some casual Elvis things',
    end: true
  },
  {
    id: '20',
    message:'Here are some local outdoor activities',
    end: true
  },
  {
    id: '21',
    message:"Does this sound good to you?",
    end: true
  },
  {
    id: '22',
    message:"Here are some popular shops around you?",
    end: true
  },
  
  
]
export default class App extends React.Component{
  render() {
    return (
      <View style={style.container}>
        <Chatbox steps={steps} />
      </View>
    
    );
  }
}