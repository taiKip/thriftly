package com.example.api.utils;

import org.springframework.stereotype.Service;

@Service
public class UtilityFunctions {
   public double calculateSubTotal(double price, double quantity){
       return  price*quantity;
   }
}
