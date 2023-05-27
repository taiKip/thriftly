package com.example.api.tag;

import com.example.api.blog.Blog;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.validation.annotation.Validated;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Validated
public class Tag {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    @JoinColumn(name = "blog_id")
    @ManyToOne
    private Blog blog;
}
