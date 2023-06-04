package com.example.api.user;

import com.example.api.address.Address;
import com.example.api.blog.Blog;
import com.example.api.order.Order;
import com.example.api.token.Token;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "_user")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Column(unique = true)
    private String email;
    @JsonIgnore
    private String password;
    private boolean isBanned;
    @Enumerated(EnumType.STRING)
    private Role role;
    @OneToMany(mappedBy = "user")
    @ToString.Exclude
    @JsonManagedReference
    @JsonIgnore
    private List<Token> tokens;
    @OneToMany(mappedBy = "user")
    @JsonBackReference
    @ToString.Exclude
    @JsonManagedReference
    @JsonIgnore
    private List<Order> orders;

    @OneToMany(mappedBy = "user")
    @JsonManagedReference
    @ToString.Exclude
    @JsonIgnore
    private Set<Blog> blogs;
    @ManyToMany(mappedBy = "users")
    @ToString.Exclude
    @JsonIgnore
    private Set<Address> addresses;

    @JsonIgnore
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return role.getAuthorities();
    }

    @Override
    public String getUsername() {
        return email;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
