package com.booktalk.booktalk_app.Services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.booktalk.booktalk_app.Entities.User;
import com.booktalk.booktalk_app.Repositories.BookRepository;
import com.booktalk.booktalk_app.Repositories.ChapterRepository;
import com.booktalk.booktalk_app.Repositories.UserBookRepository;
import com.booktalk.booktalk_app.Repositories.UserRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class GeneralPurposeService {
    private BookRepository books;
    private ChapterRepository chapters;
    private UserRepository users;
    private UserBookRepository connections;

    @Transactional
    public boolean deleteUserById(Long id){
        if(!users.existsById(id)){
            return false;
        }
        connections.deleteAllByUser_UserId(id);
        users.deleteById(id);
        return true;
    }
    @Transactional
    public boolean deleteUserByEmail(String email){
        if(!users.existsByEmail(email)){
            return false;
        }
        connections.deleteAllByUser_Email(email);
        users.deleteByEmail(email);
        return true;
    }
    @Transactional
    public boolean insertUser(User user){
        if(users.existsByEmail(user.getEmail())){
            return false;
        }
        users.save(user);
        return true;
    }
}
