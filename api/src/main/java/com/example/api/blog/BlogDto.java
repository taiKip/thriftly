package com.example.api.blog;

import java.util.Set;

public record BlogDto(String imageUrl, String title, String content, String estimatedReadTime, String publishedAt, Set<String> tags) {
}
