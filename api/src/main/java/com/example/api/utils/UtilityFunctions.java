package com.example.api.utils;

import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Base64;

@Service
public class UtilityFunctions {
   public double calculateSubTotal(double price, double quantity){
       return  price*quantity;
   }
}
