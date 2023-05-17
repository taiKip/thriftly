package com.example.api.dto;

import org.springframework.data.domain.Page;

public record TitlePageDto<T>(String title, Page<T> page) {
}
