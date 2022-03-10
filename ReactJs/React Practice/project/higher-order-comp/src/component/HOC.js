import React from 'react'
const styles ={
    dark:{
        background :"black",
        color:"white"
    }
}
export default function HOC(Button) {
  return function(args){
    let temp ={};
      if(args.dark){
        temp = {...styles.dark}
      }
      let obj = {...args,style:temp}
      return <Button {...obj} />
  }
}
