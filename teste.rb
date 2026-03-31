
print "Qual o tamanho do tabuleiro?|: "
print " |"
puts 
#colnum = gets.chomp
#colnum = colnum.to_i
colnum = 3
matrix = Array.new(colnum){Array.new(colnum, " *")}
puts
dificulty = <<-"FIM"
    1|   facil   |
    2|   medio   |
    3|  dificil  |

    FIM
puts dificulty
print "Qual a dificuldade?|: "
input = "3"
totalmines = 0
#while(true)
  if input == "1" || input == "facil"
    totalmines = (colnum * colnum)/1.8
  #  break
  elsif input == "2" || input == "medio"
    totalmines = (colnum * colnum)/1.7
  #  break
  elsif input == "3" || input == "dificil"
    totalmines = (colnum * colnum)/1.6
  #  break
  else
    puts "RESPOSTA INVALIDA"
  end
#end
puts totalmines
totalmines = totalmines.to_i
def showtab(user)
  counter = 0
  kol = user.length
  print " +"
  counter.upto(kol - 1) do |n|
    print " #{counter}"
    counter +=1
  end
  puts
  counter = 0
  user.each do |n|
    print " #{counter}"
    n.each do |m|
      print " *"
      
    end
    puts 
    counter +=1
  end
end
def addmines(user, quant, kol)
  quant = quant - 1
  counter = 0
  '''
  while quant < 
  end  '''
  
  
  print user
  countX = rand(kol)
  countY = rand(kol)
  user[countX][countY] = " X"

end 
def debug(user)
  user.each do |n|
    n.each do |m|
      print m
    end
    puts
  end
end
#showtab(matrix)
addmines(matrix, totalmines, colnum)
debug(matrix)







