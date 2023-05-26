package com.example.api.utils;
import com.example.api.dto.TitlePageDto;
import com.example.api.review.ReviewService;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
@Service
public class PageResponseDtoMapper<T> implements Function<TitlePageDto<T>, Map<String,Object>> {
private ReviewService reviewService;
    @Override
    public Map<String, Object> apply(TitlePageDto titlePageDto) {
        Map<String,Object> response =new HashMap<>();
        response.put(titlePageDto.title(),  titlePageDto.page().getContent());

        response.put("currentPage",titlePageDto.page().getNumber());
        response.put("totalItems",titlePageDto.page().getTotalElements());
        response.put("totalPages",titlePageDto.page().getTotalPages());
        response.put("nextPage",titlePageDto.page().hasNext());
        response.put("hasPreviousPage",titlePageDto.page().hasPrevious());
        return response;
    }
}
