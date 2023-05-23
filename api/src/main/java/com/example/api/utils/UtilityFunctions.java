package com.example.api.utils;

public class UtilityFunctions {
    public static long[] deleteLastElement(long[] array){
      long [] newArray = new long[array.length-1];
      for(int i=0;i<newArray.length;i++){
          newArray[i] = array[i];
      }
      return newArray;
    }
}
