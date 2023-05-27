package com.example.api.blog;

import com.example.api.entity.BaseEntity;
import com.example.api.tag.Tag;
import com.example.api.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Blog extends BaseEntity {
    @Id
    @GeneratedValue
    private Long id;
    private String title;
    private String content;
    @Column(name = "image")
    private String imageUrl;
    @Column(name = "readTime")
    private String estimatedReadTime;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @OneToMany(mappedBy = "blog")
    private Set<Tag> tags;
}
