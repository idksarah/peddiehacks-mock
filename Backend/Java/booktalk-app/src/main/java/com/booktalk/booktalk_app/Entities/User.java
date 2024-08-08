package com.booktalk.booktalk_app.Entities;


import java.util.List;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "userId")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false, unique = true)
    @Email(message = "Must be a valid email")
    @NotEmpty(message = "Must not be an empty email")
    private String email;

    @Column(nullable = false,unique = true)
    @NotEmpty(message = "Must not be an empty username")
    private String username;

    @Column(nullable = false)
    @NotEmpty(message = "Must not be an empty password")
    private String password;

    @Column(nullable = false)
    @NotNull(message = "Must state the frequency")
    private Double frequency;

    @OneToMany(mappedBy = "user")
    private List<UserBook> connectors;

}
