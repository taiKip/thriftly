package com.example.api.category;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryDto{
   private String name;
   private String image;
   private Long parentId =null;
    private int height =0;
}
