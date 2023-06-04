package com.example.api.blog;

import com.example.api.entity.BaseEntity;
import com.example.api.user.User;
import jakarta.persistence.*;
import lombok.*;





@Entity
@Getter
@Setter
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

}
